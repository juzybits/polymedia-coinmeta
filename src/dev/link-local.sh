#!/usr/bin/env bash

set -o nounset      # Treat unset variables as an error when substituting
set -o errexit      # Exit immediately if any command returns a non-zero status
set -o pipefail     # Prevent errors in a pipeline from being masked
set -o xtrace       # Print each command to the terminal before execution

PATH_THIS=$HOME/data/code/polymedia-coinmeta
PATH_SUITCASE=$HOME/data/code/polymedia-suitcase

cd $PATH_SUITCASE
pnpm build

cd $PATH_THIS/src/cli
pnpm link $PATH_SUITCASE/src/node

cd $PATH_THIS/src/web
pnpm link $PATH_SUITCASE/src/react
