# list of files to watch to trigger the automatic refreshing of testing via test-continuously-watching

define to_watch =
lib/dummy-aws-stack.ts
test/dummy-aws.test.ts
endef

# one off test
.PHONY: test
test:
	npm test 2>&1 | less -r

# require `entr` for this
.PHONY: test-continuously-watching
# expose this as a env var - https://stackoverflow.com/a/649462/1570165
export to_watch
test-continuously-watching:
	@echo "$$to_watch" | entr npm test

# get meta info about cdk setup
.PHONY: doctor
doctor:
	npm run cdk doctor

.PHONY: diff
diff:
	npm run cdk diff

.PHONY: deploy
deploy:
	npm run cdk deploy

.PHONY: destroy
destroy:
	npm run cdk destroy
