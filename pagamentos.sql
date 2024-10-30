
CREATE TABLE `clientes` (
  `clienteId` int NOT NULL AUTO_INCREMENT,
  `cnpj` varchar(45),
  `razaoSocial` varchar(45),
  `email` longtext,
  PRIMARY KEY (`clienteId`)
);

CREATE TABLE `condicoespagamentos` (
  `condicaoPagamentoId` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45),
  `dias` varchar(45),
  PRIMARY KEY (`condicaoPagamentoId`)
);

CREATE TABLE `produtos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Sku` varchar(45),
  `Descricao` varchar(45),
  PRIMARY KEY (`Id`)
);

CREATE TABLE `historicoprecos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ProdutoId` int DEFAULT NULL,
  `preco` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_HistoricoPrecos_ProdutoId` (`ProdutoId`),
  CONSTRAINT `FK_HistoricoPrecos_Produtos_ProdutoId` FOREIGN KEY (`ProdutoId`) REFERENCES `produtos` (`Id`) ON DELETE RESTRICT
);


CREATE TABLE `relatoriopagamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `HistoricoPrecoid` int DEFAULT NULL,
  `condicaoPagamentoId` int DEFAULT NULL,
  `clienteId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_RelatorioPagamentos_clienteId` (`clienteId`),
  KEY `IX_RelatorioPagamentos_condicaoPagamentoId` (`condicaoPagamentoId`),
  KEY `IX_RelatorioPagamentos_HistoricoPrecoid` (`HistoricoPrecoid`),
  CONSTRAINT `FK_RelatorioPagamentos_Clientes_clienteId` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`clienteId`) ON DELETE RESTRICT,
  CONSTRAINT `FK_RelatorioPagamentos_CondicoesPagamentos_condicaoPagamentoId` FOREIGN KEY (`condicaoPagamentoId`) REFERENCES `condicoespagamentos` (`condicaoPagamentoId`) ON DELETE RESTRICT,
  CONSTRAINT `FK_RelatorioPagamentos_HistoricoPrecos_HistoricoPrecoid` FOREIGN KEY (`HistoricoPrecoid`) REFERENCES `historicoprecos` (`id`) ON DELETE RESTRICT
);

SELECT * FROM clientes;



