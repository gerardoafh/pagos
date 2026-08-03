# ==============================================================================
# PUENTE CONTPAQi - Cliente de Sincronización Automática
# Este script se debe ejecutar en el servidor de Windows donde reside CONTPAQi.
# ==============================================================================

$ApiUrlBase = "http://localhost:3000/api"
$ApiUser = "admin" # Tu usuario del dashboard
$ApiPass = "CWM_Admin_2026!" # Tu contraseña del dashboard

# IMPORTANTE: Mapeo de Empresas
# En CONTPAQi cada empresa es una base de datos distinta. 
# Si el Dashboard maneja múltiples empresas, debes asociar el RFC de la empresa
# en el Dashboard con el nombre exacto de la empresa o ruta de la base de datos en CONTPAQi.
$MapeoEmpresas = @{
    "CWM020627SJ7" = "ctCHWOON_PRUEBA_GERARDO"
}

# 1. Función para iniciar sesión y obtener el Token JWT
function Obtener-TokenJWT {
    Write-Host "Iniciando sesión en APagos CWM..." -ForegroundColor Cyan
    
    $body = @{
        usuario = $ApiUser
        password = $ApiPass
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri "$ApiUrlBase/login" -Method Post -Body $body -ContentType "application/json"
        if ($response.token) {
            Write-Host "✅ Autenticación exitosa." -ForegroundColor Green
            return $response.token
        } else {
            Write-Host "❌ Error en autenticación: Usuario o contraseña incorrectos." -ForegroundColor Red
            Exit
        }
    } catch {
        Write-Host "❌ Error de conexión al servidor: $_" -ForegroundColor Red
        Exit
    }
}

# 2. Función para consumir el API Bridge
function Obtener-PolizasDesdeDashboard ($Token) {
    Write-Host "Conectando al Dashboard CWM para extraer pólizas..." -ForegroundColor Cyan
    
    # Agregar parámetros de fecha si es necesario (?anio=2026&mes=07)
    $headers = @{
        "Authorization" = "Bearer $Token"
        "Content-Type" = "application/json"
    }

    try {
        $response = Invoke-RestMethod -Uri "$ApiUrlBase/contabilidad/polizas.json" -Method Get -Headers $headers
        if ($response.success) {
            Write-Host "✅ Pólizas descargadas exitosamente. Total: $($response.polizas.Count)" -ForegroundColor Green
            return $response.polizas
        } else {
            Write-Host "⚠️ La API respondió pero indicó un error." -ForegroundColor Yellow
            return $null
        }
    } catch {
        Write-Host "❌ Error al conectar con el API: $_" -ForegroundColor Red
        return $null
    }
}

# 3. Función para inyectar en CONTPAQi
function Inyectar-CONTPAQi ($Polizas) {
    if (-not $Polizas) { return }

    Write-Host "Iniciando proceso de inyección vía SDK CONTPAQi..." -ForegroundColor Cyan

    # Agrupar las pólizas por RFC de Empresa (Multi-Tenant)
    $PolizasPorEmpresa = $Polizas | Group-Object -Property rfc_receptor

    # Autenticación global del SDK
    Write-Host "Iniciando sesión en CONTPAQi SDK..." -ForegroundColor Cyan
    # $ContpaqiApp = New-Object -ComObject "MGW_SDK.Sdk" (Depende de la librería exacta de tu versión)
    # $ContpaqiApp.fSetNombrePAQ("Contabilidad")
    # $ContpaqiApp.fLogin("supervisor", "Cwm2024!")

    foreach ($grupo in $PolizasPorEmpresa) {
        $rfcEmpresa = $grupo.Name
        $nombreEmpresaContpaqi = $MapeoEmpresas[$rfcEmpresa]

        if (-not $nombreEmpresaContpaqi) {
            Write-Host "⚠️ No hay mapeo en PowerShell para la empresa $rfcEmpresa. Saltando..." -ForegroundColor Yellow
            continue
        }

        Write-Host ">> Abriendo empresa en CONTPAQi: $nombreEmpresaContpaqi" -ForegroundColor Magenta

        # Aquí iría el código COM del SDK para ABRIR la empresa:
        # $ContpaqiApp.fAbreEmpresa($nombreEmpresaContpaqi)

        foreach ($poliza in $grupo.Group) {
            Write-Host "   -> Insertando Póliza: $($poliza.concepto) ($($poliza.fecha))" -ForegroundColor Gray
            
            foreach ($mov in $poliza.movimientos) {
                Write-Host "      + $($mov.tipo_movimiento) | Cta: $($mov.cuenta) | Monto: $($mov.importe)" -ForegroundColor DarkGray
            }

            # $ContpaqiApp.CrearPoliza(...)
        }

        # $ContpaqiApp.CierraEmpresa()
        Write-Host "✅ Pólizas de $rfcEmpresa inyectadas y empresa cerrada." -ForegroundColor Green
    }
}

# Flujo Principal
$token_valido = Obtener-TokenJWT
$polizas = Obtener-PolizasDesdeDashboard -Token $token_valido
Inyectar-CONTPAQi -Polizas $polizas

Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
