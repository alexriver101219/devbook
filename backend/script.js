import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
export const options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '30s', target: 20 },
    { duration: '5s', target: 0 },
  ],
};

export default function () {
  const url = 'http://localhost:5000/api/register';
  
  // Combinar el ID del usuario virtual y la iteración para evitar correos duplicados
  const uniqueId = `${__VU}_${__ITER}_${Date.now()}`;
  
  const payload = JSON.stringify({
    nombre: `Usuario ${uniqueId}`,
    correo: `usuario_${uniqueId}@devbook.com`,
    password: 'Password123'
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status es 201 o 200': (r) => r.status === 201 || r.status === 200,
  });

  sleep(1);
}
export function handleSummary(data) {
  return {
    "reporte_k6.html": htmlReport(data),
  };
}
