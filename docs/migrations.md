# Migrations
Ce fichier permettra de comprendre comment effectuer une migration

## Création
Pour créer une migration, il faut lancer la commande suivante:
```bash
bun migrate:create nom_de_ma_migration
```
Ne pas oublier de définir le type a l'aide du générique de la fonction collection
```ts
db.collection<Prisma.UserInformationsUncheckedCreateInput>()
```

## Déployer migration
Pour déployer, il faut compiler le fichier avant de pouvoir lancer la migration
### Compiler le fichier 
```bash
bun x tsc 1708098801559_migration.ts
```
### Déployer la migration
```bash
bun migrate:up
```

## Annuler la dernière migration
Pour annuler la dernière migration
```bash
bun migrate:down
```