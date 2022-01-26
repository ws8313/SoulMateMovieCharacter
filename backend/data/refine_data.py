import os
import sys
from app import db
from models import *
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
import json

def delete_null_image_in_DB():
    null_image_url = "https://www.personality-database.com/images/profile_transparent.png"
    db.session.query(Character).filter(Character.image_link == null_image_url).delete()                
    db.session.commit()


def delete_html_entity():
    # db.session.query(Movie).filter(Movie.)