from flask import Flask
from flask import send_file
from flask import request
import shutil
import os

app = Flask(__name__)

@app.route("/")
def hello():
    myCmd = 'mn create-app '
    
    name = request.args.get('name')
    lang = request.args.get('lang')
    build = request.args.get('build')

    if name: myCmd += name
    if lang: myCmd += ' -lang ' + lang
    if build: myCmd += ' -build ' + build

    os.system(myCmd)
    shutil.make_archive(name, 'zip', name)
    shutil.rmtree('./' + name)
    path = './' + name + '.zip'
    
    return send_file(path, as_attachment=True)