import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    API_GATEWAY_URL: str = os.getenv("API_GATEWAY_URL", "http://localhost:8080")
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "bbp-secret-key-2025")
    PORT: int = int(os.getenv("PORT", "8004"))

settings = Settings()
