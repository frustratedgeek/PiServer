
## ----- IMPORTS -----

from flask import render_template, request, make_response
from datetime import datetime, timedelta
from urllib import urlopen
import os
import math

import userControl



## ----- GLOBAL VARIABLES -----

passwordExpireDays = ## REMOVED
localExpireDays = ## REMOVED
loginExpireHours = ## REMOVED
varUsers = {}



## ----- STARTUP -----

def startup():
    for root, dirs, files in os.walk("/home/pi/webserver/data/users", topdown=False):
        for name in dirs:
            f = open('/home/pi/webserver/data/users/' + str(name) + '/password.txt')
            password = f.read()
            f.close()
            password = ## REMOVED
            varUsers[name] = password
    return
startup()



## ----- IP ADDRESSES -----

def userAddress():
    return request.remote_addr

def currentPublicIP():
    return urlopen('http://ip.42.pl/raw').read()



## ----- COOKIES -----

def createCookie(## REMOVED):
    ## REMOVED
    return response

def readCookie(x):
    return request.cookies.get(x)

def logout():
    ## REMOVED
    return response



## ----- SECURITY -----

def authenticate(## REMOVED):
    ## REMOVED

def createHash(user, userInput):
    ## REMOVED
    return random
    
def encrypt(x):
    ## REMOVED
    return value

def validSession():
    ## REMOVED

def loginExpire():
    return
    
    

## ----- PING REQUESTS -----

def pcPingStatus(x):
    if os.system('ping -c 1 ' + str(x)) == 0:
        return True
    else:
        return False
