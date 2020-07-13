import os.path
import time

import cherrypy
from demo import compute_single_label, load_model_to_mem,load_demo_input

print("")
print("Loading classifer...")
global cache
cache = load_model_to_mem()
print("Cached models!")


class StringPredicter(object):
    @cherrypy.expose
    def index(self):

        return open('public/0shot.html')

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def predict(self):
        start_time = time.time()
        cherrypy.response.headers['Content-Type'] = 'application/json'
        data = cherrypy.request.json
        # model_list = ["MNLI", "FEVER", "RTE"]  # FIXED !

        result = []
        for label in data["labels"]:
            each_label_result = {"label": label, 'Average': 0.}
            test_examples = load_demo_input(data["text"], label.split(' | '))
            for model_name in data["models"]:
                model = cache[model_name][0]
                tokenizer = cache[model_name][1]
                each_label_result[model_name] = round((100. * compute_single_label(test_examples, model, tokenizer)), 3)
                each_label_result['Average'] += each_label_result[model_name]
            each_label_result['Average'] = round((each_label_result['Average'] / len(data["models"])),3 )
            result.append(each_label_result)
        result = sorted(result, key= lambda i: i['Average'])
        print("{}Labels, {}Models, Response time:{:0.4f}s".format(len(data["labels"]), len(data["models"]), (time.time() - start_time)))
        return result


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
             },

    }
    print("Starting rest service...")
    config = {'server.socket_host': '0.0.0.0'}
    cherrypy.config.update(config)
    cherrypy.config.update({'server.socket_port': 8081})
    cherrypy.quickstart(StringPredicter(), '/', conf)