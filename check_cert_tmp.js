const crypto = require('crypto');
const fs = require('fs');
try {
  const certBuf = fs.readFileSync('credenciales/cercwm.cer');
  const certDer = Buffer.concat([
    Buffer.from('-----BEGIN CERTIFICATE-----\n'),
    Buffer.from(certBuf.toString('base64').match(/.{1,64}/g).join('\n')),
    Buffer.from('\n-----END CERTIFICATE-----\n')
  ]);
  const cert = new crypto.X509Certificate(certDer);
  console.log('Valido desde:', cert.validFrom);
  console.log('Hasta:', cert.validTo);
  console.log('Issuer:', cert.issuer);
  console.log('Subject:', cert.subject);
} catch (e) {
  console.error(e);
}
