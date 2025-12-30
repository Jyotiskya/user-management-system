from flask import Blueprint, request, jsonify
from app.models import User, db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
import re

auth_bp = Blueprint('auth', __name__)

def validate_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

def validate_password(password):
    return len(password) >= 8

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if not validate_email(data.get('email', '')):
        return jsonify({"error": "Invalid email format"}), 400
    if not validate_password(data.get('password', '')):
        return jsonify({"error": "Password must be at least 8 chars"}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 409

    user = User(
        full_name=data['full_name'],
        email=data['email'],
        role='user'
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=user.id, additional_claims={"role": user.role})
    return jsonify({"token": token, "user": user.to_dict()}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()

    if user and user.check_password(data.get('password')):
        if user.status == 'inactive':
            return jsonify({"error": "Account is inactive"}), 403
            
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        token = create_access_token(identity=user.id, additional_claims={"role": user.role})
        return jsonify({"token": token, "user": user.to_dict()}), 200
    
    return jsonify({"error": "Invalid credentials"}), 401

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict()), 200