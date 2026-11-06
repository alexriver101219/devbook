import subprocess
import os

# Configuración de variables
TARGET_URL = "https://devbook-alex.vercel.app"
REPORT_NAME = "owasp_zap_report_devbook.html"

def run_zap_scan():
    print(f"Iniciando escaneo de seguridad en: {TARGET_URL}...")
    
    # Comando utilizando la imagen oficial de OWASP ZAP en Docker
    cmd = [
        "docker", "run", "--rm",
        "-v", f"{os.getcwd()}:/zap/wrk/:rw",
        "-t", "ghcr.io/zaproxy/zaproxy:stable",
        "zap-baseline.py",
        "-t", TARGET_URL,
        "-r", REPORT_NAME
    ]

    try:
        # Ejecuta el escaneo y guarda la salida
        subprocess.run(cmd, check=True)
        print(f"\n✅ Escaneo completado con éxito.")
        print(f"📄 Reporte HTML generado: {REPORT_NAME}")
    except subprocess.CalledProcessError as e:
        print(f"\n⚠️ El escaneo finalizó con advertencias/alertas (Código de salida: {e.returncode}).")
        print(f"📄 Revisa el archivo generado: {REPORT_NAME}")

if __name__ == "__main__":
    run_zap_scan()