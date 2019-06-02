
## ----- IMPORTS -----

from datetime import datetime, timedelta
import time
import os
import ast

import network
import timings
import flags



## ----- GLOBAL VARIABLES -----

varUsers = {}
settingsChangeTime = 0
passwordChangeTime = ## REMOVED
passwordChange = ## REMOVED



## ----- FUNCTIONS -----

def startup():
    for root, dirs, files in os.walk("/home/pi/webserver/data/users", topdown=False):
        for name in dirs:
            for root, dirs, files in os.walk("/home/pi/webserver/data/users/" + str(name), topdown=False):
                for file in files:
                    key = name + '-' + file[:-4]
                    f = open('/home/pi/webserver/data/users/' + str(name) + '/' + file)
                    data = f.read()
                    f.close()
                    varUsers[key] = data
    for key in varUsers:
        if 'customStyle' in key:
            store = ast.literal_eval(varUsers[key])
            varUsers[key] = store
    return
startup()

lastUser = [False, datetime.now()]
def latestUser(command, user, time):
    global lastUser
    if command == 'write':
        lastUser[0] = user
        lastUser[1] = datetime.now() + timedelta(seconds = time)
    else:
        if datetime.now() >= lastUser[1]:
            lastUser[0] = False
            lastUser[1] = datetime.now()
        return lastUser[0]

def user(x):
    directory_list = list()
    directory_list.append(False)
    directory_list[0] = latestUser('read', False, False)
    for root, dirs, files in os.walk("/home/pi/webserver/data/users", topdown=False):
        for name in dirs:
            directory_list.append(name)
    try:
        return directory_list[x]
    except:
        return ''

def currentUser(x):
    user = ## REMOVED
    try:
        if x == 'user':
            return user
        elif x == 'loginExpire':
            time = varUsers[user + '-' + x]
            expiry = datetime.strptime(time, '%Y-%m-%d %H:%M:%S.%f')
            difference = expiry - datetime.now()
            seconds = difference.total_seconds()
            leadTime = 60 * 15
            if seconds >= leadTime:
                return False
            else:
                return True
        elif x == 'expireCount':
            try:
                time = varUsers[user + '-' + 'loginExpire']
                return timings.timePassed(datetime.strptime(time, '%Y-%m-%d %H:%M:%S.%f'))
            except:
                return (100, 'years')
        elif x == 'notificationsDisplay':
            try:
                return varUsers[user + '-' + 'notification']
            except:
                return 'False'
        else:
            time = varUsers[user + '-' + x]
            return datetime.strptime(time, '%Y-%m-%d %H:%M:%S.%f')
    except:
        return False

def saveUser(command, user, time):
    if command == 'login':
        try:
            f = open('/home/pi/webserver/data/users/' + str(user) + '/lastLoggedIn.txt', 'w')
            f.write(str(time))
            f.close()
            flags.userUpdate()
            return
        except:
            return
    else:
        return

def saveLogoutTime(x):
    user = x[0]
    times = x
    del times[0]
    time = max(times)
    f = open('/home/pi/webserver/data/users/' + str(user) + '/loginExpire.txt', 'w')
    f.write(str(time))
    f.close()
    flags.userUpdate()
    return

def changePassword(user, old, new, confirm):
    ## REMOVED

def welcomeMessage(hour):
    message = 'Good ' + timings.dayPart(hour) + ' ' + currentUser('user')
    return message

def customStyle(style):
    if style == 'colour':
        return varUsers[currentUser('user') + '-customStyle']['backgroundColour']
    elif style == 'opacity':
        return varUsers[currentUser('user') + '-customStyle']['backgroundOpacity']
    else:
        return ''

def setStyle(backgroundColour, backgroundOpacity):
    global varUsers, settingsChangeTime
    user = currentUser('user')
    varUsers[user + '-customStyle']['backgroundColour'] = backgroundColour
    varUsers[user + '-customStyle']['backgroundOpacity'] = backgroundOpacity
    newDictionary = {'backgroundColour': backgroundColour, 'backgroundOpacity': backgroundOpacity}
    f = open('/home/pi/webserver/data/users/' + str(user) + '/customStyle.txt', 'w')
    f.write(str(newDictionary))
    f.close()
    settingsChangeTime = datetime.now()
    return

def settingsStat():
    if settingsChangeTime == 0:
        return ''
    else:
        if datetime.now() <= settingsChangeTime + timedelta(seconds=5):
            return 'Your settings have been updated'
        else:
            return ''

def passwordStat():
    ## REMOVED
