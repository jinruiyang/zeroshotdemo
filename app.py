import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
from demo import main as compute_prob

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('ZeroShot.html')

@app.route('/predict',methods=['POST'])
def predict():

    text = list(request.form.values())[0]
    label1 = list(request.form.values())[1]
    label2 = list(request.form.values())[2]
    label3 = list(request.form.values())[3]

    prob1 = compute_prob(text, label1)
    prob2 = compute_prob(text, label2)
    prob3 = compute_prob(text, label3)


    return render_template('ZeroShot.html', prediction_text='Prob1: {:0.4f} \n Prob2: {:0.4f} \n Prob3: {:0.4f}'.format(prob1, prob2, prob3))

# @app.route('/results',methods=['POST'])
# def results():
#
#     data = request.get_json(force=True)
#     prediction = model.predict([np.array(list(data.values()))])
#
#     output = prediction[0]
#     return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True)