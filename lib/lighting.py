
### ----- IMPORTS -----

from datetime import datetime, timedelta
from threading import Thread
import time

import IOPiPlus1
import threads



### ----- GLOBAL VARIABLES -----

lightsStatus = [1]*8
relayTimeDelay = 0.5
lightUsage = False



### ----- LIGHT CONTROL FUNCTIONS -----

def bathroom():
    IOPiPlus1.pulse(2)
    return
def kitchenAmbient():
    IOPiPlus1.pulse(4)
    return
def lounge():
    IOPiPlus1.pulse(6)
    return
def bedroom1Ambient():
    IOPiPlus1.pulse(8)
    return
def bedroom1Main():
    IOPiPlus1.pulse(10)
    return
def bedroom2():
    IOPiPlus1.pulse(12)
    return
def kitchenMain():
    IOPiPlus1.pulse(14)
    return
def hall():
    IOPiPlus1.pulse(16)
    return

allLights = [bathroom, kitchenAmbient, lounge, bedroom1Ambient, bedroom1Main, bedroom2, kitchenMain, hall]



### ----- LIGHT STATUS FUNCTIONS -----

def setLightsStatus(x):
    global lightsStatus
    lightsStatus = x
    return

def getLightStatus(x):
    status = lightsStatus[x-1]
    if status == 0:
        return 'on'
    else:
        return 'off'

def status(x):
    if x == 'hall':
        return getLightStatus(1)
    elif x == 'kitchenMain':
        return getLightStatus(2)
    elif x == 'bedroom2':
        return getLightStatus(3)
    elif x == 'bedroom1Main':
        return getLightStatus(4)
    elif x == 'bedroom1Ambient':
        return getLightStatus(5)
    elif x == 'lounge':
        return getLightStatus(6)
    elif x == 'kitchenAmbient':
        return getLightStatus(7)
    elif x == 'bathroom':
        return getLightStatus(8)
    else:
        return None



### ----- LIGHT SWITCHING FUNCTIONS -----

def switch(x):
    if x == 'allSwitch':
        lightSwitch(allLights)
    elif x == 'allOn':
        allSame('on')
    elif x == 'allOff':
        allSame('off')
    elif x == 'bedroom1All':
        lightSwitch([bedroom1Ambient, bedroom1Main])
    elif x == 'kitchenAll':
        lightSwitch([kitchenAmbient, kitchenMain])
    else:
        lightSwitch(x)
    return

def lightSwitch(lights):
    global lightUsage
    if lightUsage == False:
        lightUsage = True
        try:
            if isinstance(lights, str) == False:
                for light in lights:
                    light()
                    time.sleep(relayTimeDelay)
            else:
                for light in allLights:
                    if lights == light.__name__:
                        light()
        except:
            pass
        lightUsage = False
    else:
        pass
    return

def allSame(desired):
    now = 'off'
    if desired == 'off':
        now = 'on'
    lights = []
    for light in allLights:
        if status(light.__name__) == now:
            lights.append(light)
    lightSwitch(lights)
    return

def scheduleRun(lightingDevices, minimumLightLevel):
    storageList = []
    for key in lightingDevices:
        if lightingDevices[key] != status(key):
            for light in allLights:
                if key == light.__name__:
                    storageList.append(light)
    ## DO SOMETHIGN HERE WITH MINIMUM LIGHT LEVEL
    lightSwitch(storageList)
    return
