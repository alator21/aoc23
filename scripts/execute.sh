#!/usr/bin/env sh

day="$1";
part="$2";

if [ -z "${day}" ] || [ -z "${part}" ]; then
  echo 'You must input a day and a part!'
  exit 1;
fi

bun src/"${day}"/part"${part}".ts