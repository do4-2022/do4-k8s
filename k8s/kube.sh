#!/bin/bash

action=$1

if [[ $action != "apply" && $action != "delete" ]]; then
  echo "Usage: bash kube.sh [apply|delete]"
  exit 1
fi

# Déploiement des ressources
if [[ $action == "apply" ]]; then
  kubectl apply -f ./deployment/webapp.yml
  kubectl apply -f ./deployment/ms.yml
  kubectl apply -f ./deployment/database.yml
  kubectl apply -f ./service/webapp.yml
  kubectl apply -f ./service/ms.yml
  kubectl apply -f ./service/database.yml
fi

# Suppression des ressources
if [[ $action == "delete" ]]; then
    kubectl delete -f ./deployment/webapp.yml
    kubectl delete -f ./deployment/ms.yml
    kubectl delete -f ./deployment/database.yml
    kubectl delete -f ./service/webapp.yml
    kubectl delete -f ./service/ms.yml
    kubectl delete -f ./service/database.yml
fi