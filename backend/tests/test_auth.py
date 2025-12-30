import pytest
from app import create_app, db
from app.models import User

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:' # Use in-memory DB for tests
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client

# [cite_start]Test 1: Successful Signup [cite: 131]
def test_signup(client):
    response = client.post('/api/auth/signup', json={
        "full_name": "Test User",
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 201

# [cite_start]Test 2: Invalid Email [cite: 131]
def test_invalid_email(client):
    response = client.post('/api/auth/signup', json={
        "full_name": "Test",
        "email": "bademail",
        "password": "password123"
    })
    assert response.status_code == 400

# [cite_start]Test 3: Login Success [cite: 131]
def test_login(client):
    # Create user first
    client.post('/api/auth/signup', json={
        "full_name": "Login User",
        "email": "login@example.com",
        "password": "password123"
    })
    response = client.post('/api/auth/login', json={
        "email": "login@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "token" in response.json

# [cite_start]Test 4: Login Fail [cite: 131]
def test_login_fail(client):
    response = client.post('/api/auth/login', json={
        "email": "nonexistent@example.com",
        "password": "wrong"
    })
    assert response.status_code == 401

# [cite_start]Test 5: Password Length [cite: 131]
def test_weak_password(client):
    response = client.post('/api/auth/signup', json={
        "full_name": "Weak Pass",
        "email": "weak@example.com",
        "password": "123"
    })
    assert response.status_code == 400