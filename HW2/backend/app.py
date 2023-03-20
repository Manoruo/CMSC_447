from flask import Flask, request 
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:cartoon12@localhost/HW_DB'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column("id", db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    points = db.Column(db.Integer)

    def __init__(self, name, points):
        self.name = name
        self.points = points 

def format_user(user):
    return {
        "id": user.id,
        "points": user.points,
        "name": user.name 
    }
    
        
@app.route("/")   
def home():
    return "Hello, Flask!"

# create a new user 
# create a new user 
@app.route('/user', methods=['POST'])
def create_user():
    name = request.json['name']
    points = request.json['points']
    user = User(name, points)
    db.session.add(user)
    db.session.commit()
    return {'user': format_user(user), 'id': user.id}


# serach multiple users 
@app.route("/users", methods = ["GET"])
def get_users():
    users = User.query.order_by(User.id.asc()).all()
    user_list  = []
    for user in users:
        user_list.append(format_user(user))
    return {'users': user_list}

# Search single user 
@app.route("/users/<id>", methods = ["GET"])
def get_user(id):
    user = User.query.filter_by(id=id).one()
    formatted_user = format_user(user)
    return {'user': formatted_user}


# delete user 
@app.route('/users/<id>', methods = ['DELETE'])
def delete_user(id):
    user = User.query.filter_by(id=id).one()
    db.session.delete(user)
    db.session.commit() 
    return f'Event (id: {id}) deleted'

if __name__ == '__main__':
    app.run()