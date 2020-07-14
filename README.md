# zeorshotdemo

Step 1: To download three pretrained entailment models (RTE, MNLI, FEVER), pls go to this URL: https://drive.google.com/file/d/1ILCQR_y-OSTdgkz45LP7JsHcelEsvoIn/view?usp=sharing

Step 2: Pls put your model path to Line497 in demo.py 

[Update for ESA] Step 3: Download ESA word2id.json from the URL: https://drive.google.com/file/d/1zIDDYSQhHWznDPuPifMxi1Q0fTn1dmL1/view?usp=sharing
Put word2id.json path to Line448 in ESA.py

Step 4: Download ESA matrix from the URL: https://drive.google.com/file/d/1-3-IXyvXqfi3SaycSVOqIlHGIe5Q-WPu/view?usp=sharing
Put matrix path to Line451 in ESA.py

Step 5 : 

$python3 backend_cherry.py

then in another termianl tab enter, you can Check backend with terminal:

curl -d '{"text":"The fox jumped over the fence, and the fence fell down.","models":["MNLI","FEVER", "RTE", "ESA"],"labels":["Society", "Health", "Sports"]}' -H 'Content-Type: application/json' -X POST http://localhost:8081/predict

Step 6:
 
Open url http://localhost:8081/ in the browser, then you can play with it!