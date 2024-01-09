from flask import Flask, render_template, request, redirect, url_for
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_security import Security, SQLAlchemyUserDatastore
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask import jsonify
from sqlalchemy.exc import IntegrityError
from flask import redirect, url_for


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:HondaS2000@127.0.0.1:3306/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
db = SQLAlchemy(app)
api = Api(app)
jwt = JWTManager(app)

records = []

class Finance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(10))
    theme = db.Column(db.String(20))
    details = db.Column(db.String(100))
    amount = db.Column(db.Float(precision=2))
    date = db.Column(db.Date)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

# Resource for handling finance CRUD operations
class FinanceResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('type', type=str, required=True, help='Type cannot be blank.')
    parser.add_argument('theme', type=str, required=True, help='Theme cannot be blank.')
    parser.add_argument('details', type=str, required=True, help='Details cannot be blank.')
    parser.add_argument('amount', type=float, required=True, help='Amount cannot be blank.')
    parser.add_argument('date', type=str, required=True, help='Date cannot be blank.')

    @jwt_required()
    def get(self, finance_id):
        finance = Finance.query.get_or_404(finance_id)
        return {
            'id': finance.id,
            'type': finance.type,
            'theme': finance.theme,
            'details': finance.details,
            'amount': finance.amount,
            'date': finance.date.isoformat(),
        }

    @jwt_required()
    def put(self, finance_id):
        args = self.parser.parse_args()
        finance = Finance.query.get_or_404(finance_id)
        finance.type = args['type']
        finance.theme = args['theme']
        finance.details = args['details']
        finance.amount = args['amount']
        finance.date = datetime.strptime(args['date'], '%Y-%m-%d').date()
        db.session.commit()
        return {'message': 'Finance record updated successfully.'}

    @jwt_required()
    def delete(self, finance_id):
        finance = Finance.query.get_or_404(finance_id)
        db.session.delete(finance)
        db.session.commit()
        return {'message': 'Finance record deleted successfully.'}

# Resource for handling user registration
class UserRegistrationResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', type=str, required=True, help='Username cannot be blank.')
    parser.add_argument('email', type=str, required=True, help='Email cannot be blank.')
    parser.add_argument('password', type=str, required=True, help='Password cannot be blank.')

    def post(self):
        args = self.parser.parse_args()
        new_user = User(username=args['username'], email=args['email'], password=args['password'])
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User registered successfully.'}

# Resource for handling user login and token generation
class UserLoginResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', type=str, required=True, help='Username cannot be blank.')
    parser.add_argument('password', type=str, required=True, help='Password cannot be blank.')

    def post(self):
        args = self.parser.parse_args()
        user = User.query.filter_by(username=args['username'], password=args['password']).first()

        if user:
            access_token = create_access_token(identity=user.id)
            return {'access_token': access_token}
        else:
            return {'message': 'Invalid credentials.'}, 401

class UserResource(Resource):
    @jwt_required()
    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully.'}

# Add the UserResource to the API
api.add_resource(UserResource, '/api/user/<int:user_id>')


with app.app_context():
    db.create_all()

# Add resources to the API
api.add_resource(FinanceResource, '/api/finance/<int:finance_id>')
api.add_resource(UserRegistrationResource, '/api/register')
api.add_resource(UserLoginResource, '/api/login')

# Define routes for your web pages
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.html')
def home():
    return render_template('index.html')

@app.route('/financeTracker.html')
def finance_tracker():
    return render_template('financeTracker.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/contacts.html')
def contacts():
    return render_template('contacts.html')

@app.route('/miniGame.html')
def mini_game():
    return render_template('miniGame.html')

@app.route('/signup.html')
def signup():
    return render_template('signup.html')

@app.route('/login.html')
def login():
    return render_template('login.html')

@app.route('/api/register', methods=['POST'])
def register_user():
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')

    # Check if the username already exists before attempting to create a new user
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Username already exists. Please choose a different username."}), 400

    # If the username is unique, proceed with user creation
    new_user = User(username=username, email=email, password=password)
    
    try:
        db.session.add(new_user)
        db.session.commit()

        # Redirect to the index page or provide a success response
        return render_template('index.html')

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": "An error occurred during registration. Please try again."}), 500

@app.route('/api/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
    return jsonify({'users': user_list})

@app.route('/api/delete_user', methods=['DELETE'])
@jwt_required()
def delete_user():
    # Get the current user's identity from the JWT token
    current_user_id = get_jwt_identity()

    # Use the user ID to delete the user from the database
    user_to_delete = User.query.get_or_404(current_user_id)
    db.session.delete(user_to_delete)
    db.session.commit()

    return {'message': 'User deleted successfully.'}

@app.route('/submit', methods=['POST'])
def submit():
    # Parse form data
    record = {
            'type': request.form['type'],
            'theme': request.form['theme'],
            'details': request.form['details'],
            'amount': request.form['amount'],
            'date': request.form['date']
        }

    records.append(record)
    # Convert the date string to a Python date object
    return render_template('financeTracker.html', records=records)

if __name__ == '__main__':
    app.run(debug=True)
