import os, os.path
import random
import string
import json

import cherrypy
from demo import load_model, compute_single_label, load_model_to_mem, compute_mutiple_labels

print("")
print("Loading classifer...")
global cache
cache = load_model_to_mem()
print("Cached models!")


class StringPredicter(object):
    @cherrypy.expose
    def index(self):

        return open('public/0shot.html')

    # @cherrypy.expose
    # def generate(self, length=8):
    #     some_string = ''.join(random.sample(string.hexdigits, int(length)))
    #     cherrypy.session['mystring'] = some_string
    #     return some_string

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def predict(self):
        cherrypy.response.headers['Content-Type'] = 'application/json'
        data = cherrypy.request.json
        # model_list = ["MNLI", "FEVER", "RTE"]  # FIXED !

        result = {
            "text": data["text"],
            "labels": data["labels"],
            "models": data["models"],
            "json_result": {},
            "chart_result": []

        }

        # for model_name in data["models"]:
        #     model = cache[model_name][0]
        #     tokenizer = cache[model_name][1]
        #     prob_list = compute_mutiple_labels(data["text"], data["labels"], model, tokenizer)
        #     # prob_list = compute_single_label(text, label, model, tokenizer)
        #     # this is required to fix serialization issues with np.float32
        #     for key in prob_list:
        #         prob_list[key] = round((100. * prob_list[key]), 2)
        #     result["json_result"][model_name] = prob_list
        cherrypy.session['result'] = result
        for label in data["labels"]:
            each_label_result = {"label": label, 'Average': 0.}
            for model_name in data["models"]:
                model = cache[model_name][0]
                tokenizer = cache[model_name][1]
                each_label_result[model_name] = round((100. * compute_single_label(data['text'], label, model, tokenizer)), 3)
                each_label_result['Average'] += each_label_result[model_name]
            each_label_result['Average'] = round((each_label_result['Average'] / len(data["models"])),3 )
            result["chart_result"].append(each_label_result)
        result["chart_result"] = sorted(result["chart_result"], key= lambda i: i['Average'])
        return result["chart_result"]
        # return json.dumps(result["chart_result"])


if __name__ == '__main__':
    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd())

        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './public'
        },
        '/css':
            {'tools.staticdir.on': True,
             'tools.staticdir.dir': "./public/css"
        },
        '/js':
            {'tools.staticdir.on': True,
             'tools.staticdir.dir': "./public/js"
             }
    }
    print("Starting rest service...")
    config = {'server.socket_host': '0.0.0.0'}
    cherrypy.config.update(config)
    cherrypy.config.update({'server.socket_port': 8081})
    cherrypy.quickstart(StringPredicter(), '/', conf)