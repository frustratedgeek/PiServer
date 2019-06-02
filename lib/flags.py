
## ----- IMPORTS -----

from datetime import datetime, timedelta
from threading import Thread
import time
import os

import userControl
import network
import timings



## ----- GLOBAL VARIABLES -----

varPasswordChange = [None, datetime.now()]
varLogStatus = False
varLogContents = ''
powerChange = [None, 0]



## ----- FUNCTIONS -----

def passwordChange(command, status, expiryTime):
    global varPasswordChange
    if command == 'write':
        varPasswordChange = [status, expiryTime]
        network.startup()
        return 
    else:
        if datetime.now() >= varPasswordChange[1]:
            varPasswordChange = [None, datetime.now()]
            return varPasswordChange[0]
        else:
            return varPasswordChange[0]

def userUpdate():
    userControl.startup()
    return

##def writeLogDate():
##    while True:
##        if int(timings.now('hour')) == 0 and int(timings.now('minute')) == 0 and int(timings.now('second')) == 0:
##            f = open('/home/pi/webserver/data/log.txt')
##            data = f.read()
##            f.close()
##            data = data.split('\n')
##            while len(data) > 500:
##                del data[0]
##            newData1 = '\n'.join(map(str, data))
##            date = timings.now('day') + ' ' + timings.now('date') + timings.now('extra') + ' ' + timings.now('month') + ' ' + timings.now('year')
##            newDate = '\n\n----- ' + str(date) + ' -----'
##            newData2 = newData1 + newDate
##            f = open('/home/pi/webserver/data/log.txt', 'w')
##            f.write(str(newData2))
##            f.close()
##            time.sleep(86000)
##        else:
##            time.sleep(0.5)
##
##th = Thread(target=writeLogDate)
##th.setDaemon(True)
##th.start()
##
##def logStatus(x):
##    global varLogStatus, varLogContents
##    if x == 'write':
##        if varLogStatus == False:
##            varLogStatus = True
##            f = open('/home/pi/webserver/data/log.txt')
##            data = f.read()
##            f.close()
##            varLogContents = data.replace('\n', '<br/>')
##        else:
##            varLogStatus = False
##            varLogContents = ''
##    else:
##        pass
##    return varLogStatus
##
##def logContents():
##    return varLogContents

def powerStat():
    global powerChange
    if powerChange[1] == 0:
        status = 'on'
    else:
        if powerChange[1] >= datetime.now() - timedelta(seconds=60):
            status = str(powerChange[0])
        else:
            status = 'on'
    return status

def shutDown():
    global powerChange
    powerChange = ['shutDown', datetime.now()]
    th = Thread(target=shutDownThread)
    th.setDaemon(True)
    th.start()
    return

def shutDownThread():
    print ('-'*50 + '\n')*3 + '          THE SERVER IS SHUTTING DOWN NOW!!!\n' + ('-'*50 + '\n')*3
    time.sleep(1)
    os.system('shutdown -h now')
    return None
