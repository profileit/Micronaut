#!/bin/bash
let limit=0
curl https://api.github.com/repos/micronaut-projects/micronaut-core/tags | jq -r '.[].name' | while read name ; do
	if (( $limit < 5 ))
	then
		. /root/.sdkman/bin/sdkman-init.sh && sdk install micronaut ${name//v}
	fi
	limit=$(($limit + 1))
done