
## ----- IMPORTS -----

from datetime import datetime, timedelta
import time
import os

import threads



## ----- GLOBAL VARIABLES -----

pcMacAddress = ## REMOVED
pcIpAddress = ## REMOVED
pcUserName = ## REMOVED
pcUserPassword = ## REMOVED
pcChangeTime = 0
pcChange = 0


## ----- POWER SWITCHES -----

def status(device):
    if device == 'pc':
        return pcStatus()
    else:
        return False

def pcStatus():
    global pcChangeTime, pcChange
    if pcChangeTime == 0:
        if threads.pcPingStatus() == True:
            status = 'on'
        else:
            status = 'off'
    else:
        if datetime.now() <= pcChangeTime + timedelta(seconds=45):
            status = pcChange
        else:
            if threads.pcPingStatus() == True:
                status = 'on'
            else:
                status = 'off'
    return status

def switch(device, confirm):
    if device == 'PC':
        if confirm == 'True':
            if pcStatus() == 'off':
                switchPc('on')
            else:
                switchPc('off')
    return

def switchPc(switch):
    global pcChangeTime, pcChange
    if switch == 'on':
        wakeCommand = 'wakeonlan ' + pcMacAddress
        os.system(wakeCommand)
        pcChange = 'starting up'
        pcChangeTime = datetime.now()
    else:
        shutdownCommand = 'net rpc shutdown -I ' + pcIpAddress + ' -U ' + pcUserName + '%' + pcUserPassword
        os.system(shutdownCommand)
        pcChange = 'shutting down'
        pcChangeTime = datetime.now()
    return

def scheduleRun(devices):
    for key in devices:
        if devices[key] != status(key):
            if key == 'pc':
                if devices[key] == 'on':
                    switchPc('on')
                else:
                    switchPc('off')
    return
