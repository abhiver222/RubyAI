from flask import Flask, request, jsonify
from tinydb import TinyDB, Query
from ruby import Ruby
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)
db = TinyDB('database.json')
ruby = Ruby(db)

@app.route('/', methods=['GET'])
@app.route('/health', methods=['GET'])
def health():
    print("health check")
    return jsonify({'message': 'Server is up and running'})

@app.route('/print_table', methods=['GET'])
def print_db():
    print("print db")
    table = request.args.get('table', "company")
    ruby.print_db(table)
    return jsonify({'message': 'printed db successfully'})

# Endpoint for storing company information
@app.route('/company_info', methods=['POST'])
def store_company_info():
    company_data = request.json
    print("upsert company info", company_data)
    id = ruby.upsert_company(company_data)
    return jsonify({'message': 'Company information stored successfully', 'company_id': id})

# Endpoint for storing job description information
@app.route('/job_description', methods=['POST'])
def store_job_description():
    job_data = request.json
    print("upsert job description", job_data)
    id = ruby.upsert_job(job_data)
    return jsonify({'message': 'Job description stored successfully', 'job_id': id})

@app.route('/generate_emails', methods=['POST'])
def generate_emails():
    generate_data = request.json
    print("generate emails", generate_data)
    emails = ruby.generate_emails(generate_data)
    print(emails)
    return jsonify({'message': 'generated emails successfully'})


@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    job_data = request.json
    db.insert(job_data)
    return jsonify({'message': 'Job description information stored successfully'})

if __name__ == '__main__':
    app.run()