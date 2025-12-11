.PHONY: setup install-deps husky-init

build-env:
	@echo "Building environment..."
	npm install
	@echo "Init husky config..."
	@npm run prepare
	@echo "Environment built."


# Configura husky e lint-staged
setup: install-deps husky-init

install-deps:
	@echo "Instalando dependencias..."
	npm install

# Executa husky install (caso necessário)
husky-init:
	@echo "Rodando husky install..."
	npm run prepare

lint:
	@echo "Rodando lint..."
	npm run lint:fix


run:
	@echo "Rodando aplicação..."
	npm run dev
