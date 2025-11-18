const express = require('express');
const path = require('path');
const os = require('os');


const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // expõe para a rede local


// Servir arquivos estáticos da pasta HTML
app.use(express.static(path.join(__dirname, 'HTML')));


// Fallback: enviar index.html para rotas desconhecidas (SPA-friendly)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'index.html'));
});


app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em: http://${getLocalIp()}:${5500}`);
});


function getLocalIp() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}



