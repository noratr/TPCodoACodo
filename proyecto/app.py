from flask import Flask ,jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend





# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://noratr:salmo121@noratr.mysql.pythonanywhere-services.com/noratr$proyecto'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow


# defino las tablas
class Obras(db.Model):   # la clase Obras hereda de db.Model
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    titulo= db.Column(db.String(100))
    autor=db.Column(db.String(100))
    tipo= db.Column(db.String(100))
    descripcion= db.Column(db.String(100))
    imagen=db.Column(db.String(400))

    def __init__(self,titulo,autor,tipo,descripcion,imagen):   #crea el  constructor de la clase
        self.titulo=titulo   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.autor=autor
        self.tipo=tipo
        self.tipo=descripcion
        self.imagen=imagen





    #  si hay que crear mas tablas , se hace aqui




with app.app_context():
    db.create_all()  # aqui crea todas las tablas
#  ************************************************************
class ObrasSchema(ma.Schema):
    class Meta:
        fields=('id','titulo','autor','tipo','descripcion','imagen')




obra_schema=ObrasSchema()            # El objeto producto_schema es para traer un producto
obras_schema=ObrasSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto




# crea los endpoint o rutas (json)
@app.route('/obras',methods=['GET'])
def get_Obras():
    all_obras=Obras.query.all()         # el metodo query.all() lo hereda de db.Model
    result=obras_schema.dump(all_obras)  # el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla




@app.route('/obras/<id>',methods=['GET'])
def get_obra(id):
    obra=Obras.query.get(id)
    return obra_schema.jsonify(obra)   # retorn el JSON de un producto recibido como parametro


@app.route('/obras/<id>',methods=['DELETE'])
def delete_obra(id):
    obra=Obras.query.get(id)
    db.session.delete(obra)
    db.session.commit()                     # confirma el delete
    return obra_schema.jsonify(obra) # me devuelve un json con el registro eliminado

@app.route('/obras', methods=['POST']) # crea ruta o endpoint
def create_obra():
    #print(request.json)  # request.json contiene el json que envio el cliente
    titulo=request.json['titulo']
    autor=request.json['autor']
    tipo=request.json['tipo']
    descripcion=request.json['descripcion']

    imagen=request.json['imagen']

    new_obra=Obras(titulo,autor,tipo,descripcion,imagen)
    db.session.add(new_obra)
    db.session.commit() # confirma el alta
    return obra_schema.jsonify(new_obra)


@app.route('/obras/<id>' ,methods=['PUT'])
def update_obra(id):
    obra=Obras.query.get(id)

    obra.titulo=request.json['titulo']
    obra.autor=request.json['autor']
    obra.tipo=request.json['tipo']
    obra.descripcion=request.json['descripcion']
    obra.imagen=request.json['imagen']


    db.session.commit()    # confirma el cambio
    return obra_schema.jsonify(obra)    # y retorna un json con el producto


# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)    # ejecuta el servidor Flask en el puerto 5000


