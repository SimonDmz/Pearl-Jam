# Notifications

## Glossary

- Notification : API object with some text send by a user to a user or organizational-unit, with a timestamp date
    
    example : ``` {
    "id": 1,
    "text": "test",
    "sender": "CJF96H",
    "typedRecipients": [
      {
        "id": "OU-POLE",
        "type": "organization",
        "label": "Pole National"
      }
    ],
    "date": 1623745111631
  }```
- Notification message (referenced as "message") : broker message 'ping' sent in a websocket to a front application to make it refresh its Notification list.
-----

## Notifications sources

The application generate notifications from :

- Collection managers actions (~~new survey units assigned~~, new campaign, custom message)
- Interviewer actions (synchronization summary)

Notifications are persisted in API database in Back-Office and navigator indexedDB.

---
## Notifications use cases in front application
Notifications are shown in the lateral menu and can be interacted with :

- Mark as read
- Delete a read notification

When marking a notification as read:
- the notification new Status is stored in indexedDB
- if online, a request is sent to the API to update BO data
- In offine mode this request is not sent. when network access is restored, the front application handle the differential (see below)

---

## Notifications strategy

Notifications messages sent to the broker are not stored in memory : only connected users receive the notification messages.

The front application always check notifications when opening.

### **Handling differences between front application and BO**
When comparing notifications from BO and in indexedDB :
#### **Management notifications**
 - if a management notification is present in indexedDB but missing in BO  : it is a deleted notification or the user is not  in the same organizational-unit => DELETE it in indexedDB
 - if a management notification is present in BO but missing in indexedDB : new notification => ADD it to indexedDB
 - if a management notification is present in BO and in indexedDB with a more advanced status (NOT_READ < READ < DELETED) : offline notification action in front application => POST missing status to BO

#### **Interviewer notifications**
 - if an interviewer notification is present in indexedDB but missing in BO  : new notification => ADD it to BO
 - if an interviewer notification is present in BO and in indexedDB with a more advanced status (NOT_READ < READ < DELETED) : offline notification action in front application => POST missing status to BO
  !! when are these notifications deleted ?

---

TODO :

Implémenter le POC en version propre


Question de l'aspect transactionnel de la création de message en BDD/BM
->  différence réception/lecture

Réponse : pas de transactionnel : la création en BDD est mandataire, on privilégiera un appel systématique au GET/messages au lancement du poste de collecte pour garantir la récupération des messages dont les notifications (du MB) ont échoué / consommées par le même idep. Les notifications du MB ont uniquement vocation à déclencher un appel de l'API

=> les retours de l'API sont comparés à l'état actuel de l'IDB,

Gérer la création de notifications métier sur le poste de collecte : bilan de synchronisation,... (cf pb requêtes offline)

Comment stocker les requêtes de 'READ' / 'DELETED' émises par le front en mode offline pour les rejouer une fois le réseau disponible ?

Réponse : pas besoin, lors de la récupération du mode online, un GET des notifications est réalisé, et le front compare avec le contenu de l'IDB pour résoudre le différentiel :

- les états manquants dans le BO sont ajoutés

## Durée de vie des notifications 

NB: les messages du Broker de message on une durée de vie courte : 24h max.

Les notifications ont une durée de vie à déterminer :

- définie lors de la création : suppression des messages dépassés par un batch + suppression dans le front des messages qui n'existent plus dans le BO mais sont présents dans le poste de collecte
- gérée par le métier : suppression des notifications liées à des opérations de collecte
- définie de façon générale (30 jours)

-----

## Modélisation des notifications dans le poste de collecte :

Notification dans l'API (message-controller) : ``{
    "id": 1,
    "text": "test",
    "sender": "CJF96H",
    "status" : "READ",
    "typedRecipients": [
      {
        "id": "OU-POLE",
        "type": "organization",
        "label": "Pole National"
      }
    ],
    "date": 1623745111631
  }``
  
  status is missing if not marked as read or deleted

## API endpoints

GET api/messages/{id}
=> may use keycloak token info directly server side
