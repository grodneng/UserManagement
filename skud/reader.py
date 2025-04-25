import yaml, requests
from mfrc522 import SimpleMFRC522
from datetime import datetime

# загрузка конфигурации
cfg = yaml.safe_load(open("config.yaml"))
reader = SimpleMFRC522()

while True:
    uid, _ = reader.read()
    payload = {"uid": str(uid), "timestamp": datetime.utcnow().isoformat()}
    resp = requests.post(f"http://{cfg['api_host']}:{cfg['api_port']}/api/visits", json=payload)
    print("Logged" if resp.ok else f"Error {resp.status_code}")