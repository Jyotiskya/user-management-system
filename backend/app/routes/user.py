from flask import Blueprint, request, jsonify
from app.models import User, db
from app.utils.decorators import admin_required
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint('user', __name__)

@user_bp.route('/', methods=['GET'])
@jwt_required()
@admin_required()
def get_all_users():
    page = request.args.get('page', 1, type=int)
    per_page = 10
    pagination = User.query.paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        "users": [user.to_dict() for user in pagination.items],
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": page
    }), 200

@user_bp.route('/<user_id>/status', methods=['PATCH'])
@jwt_required()
@admin_required()
def update_user_status(user_id):
    data = request.get_json()
    new_status = data.get('status')
    
    if new_status not in ['active', 'inactive']:
        return jsonify({"error": "Invalid status"}), 400
        
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    user.status = new_status
    db.session.commit()
    return jsonify(user.to_dict()), 200

@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    data = request.get_json()
    
    if 'full_name' in data:
        user.full_name = data['full_name']
    if 'email' in data:
        if data['email'] != user.email:
            if User.query.filter_by(email=data['email']).first():
                return jsonify({"error": "Email taken"}), 409
            user.email = data['email']
            
    db.session.commit()
    return jsonify(user.to_dict()), 200