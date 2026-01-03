
CREATE DATABASE IF NOT EXISTS Agenda_Contatos
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_general_ci;
USE Agenda_Contatos;

CREATE TABLE IF NOT EXISTS Contato (
    
    id INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    dataNascimento DATE,
    telefone CHAR(13) NOT NULL,
    email CHAR(1),
    endereco VARCHAR(45),
    cidade VARCHAR(45),
    estado VARCHAR(45),
    
    PRIMARY KEY (id)
) ENGINE=InnoDB;

INSERT INTO Contato (nome, telefone, dataNascimento, email, endereco, cidade, estado) VALUES(
    ('João Silva', '123-456-7890', '1990-05-15', '')
)

SHOW DATABASES;
DESCRIBE contato;

DROP TABLE IF EXISTS Contato;


-- -------------------- Listar Contatos -------------------------
DELIMITER $$
CREATE PROCEDURE sp_ListarContatos()
BEGIN
    SELECT 
    id, 
    nome, 
    dataNascimento, 
    telefone, 
    email, 
    endereco, 
    estado, 
    cidade 
    FROM Contato;
END $$
DELIMITER ;
CALL sp_ListarContatos();

-- -------------------- Listar Contatos por busca -------------------------
DELIMITER $$

CREATE PROCEDURE sp_ListarContatos (
    IN sp_Disciplina VARCHAR(100),
    IN sp_Classe CHAR(3),
    IN sp_Turma CHAR(1),
    IN sp_Regime VARCHAR(20)
)
BEGIN
    SELECT 
    id, 
    nome, 
    dataNascimento, 
    telefone, 
    email, 
    endereco, 
    estado, 
    cidade 
    FROM Contato;
END $$
DELIMITER ;
CALL sp_ListarContatos();