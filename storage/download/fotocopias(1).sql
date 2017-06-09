-- MySQL Script generated by MySQL Workbench
-- lun 27 mar 2017 12:30:27 CEST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema tutores
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tutores` ;

-- -----------------------------------------------------
-- Schema tutores
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tutores` DEFAULT CHARACTER SET latin1 ;
USE `tutores` ;

-- -----------------------------------------------------
-- Table `tutores`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tutores`.`usuario` ;

CREATE TABLE IF NOT EXISTS `tutores`.`usuario` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `tipoUsuario` VARCHAR(1) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `apellidos` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  `nombre` VARCHAR(30) CHARACTER SET 'utf8' NOT NULL,
  `username` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  `password` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  `email` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  `enabled` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `tutores`.`alumno`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tutores`.`alumno` ;

CREATE TABLE IF NOT EXISTS `tutores`.`alumno` (
  `id` INT(11) NOT NULL,
  `dni` VARCHAR(10) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `apellido1` VARCHAR(30) CHARACTER SET 'utf8' NOT NULL,
  `apellido2` VARCHAR(30) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `nombre` VARCHAR(30) CHARACTER SET 'utf8' NOT NULL,
  `fechaNac` DATE NULL DEFAULT NULL,
  `movil` VARCHAR(9) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `padre` VARCHAR(50) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `madre` VARCHAR(48) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `telCasa` VARCHAR(9) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `movilPadre` VARCHAR(9) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `movilMadre` VARCHAR(9) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `domicilio` VARCHAR(67) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `cp` VARCHAR(5) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `localidad` VARCHAR(21) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `provincia` VARCHAR(8) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `idUsuario` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UNIQ_1435D52D32DCDBAF` (`idUsuario` ASC),
  INDEX `NOMBRE` (`apellido1` ASC, `apellido2` ASC, `nombre` ASC),
  INDEX `fk_alumno_usuario1_idx` (`idUsuario` ASC),
  CONSTRAINT `FK_1435D52D32DCDBAF`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `tutores`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `tutores`.`profesor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tutores`.`profesor` ;

CREATE TABLE IF NOT EXISTS `tutores`.`profesor` (
  `id` VARCHAR(6) CHARACTER SET 'utf8' NOT NULL,
  `apellidos` VARCHAR(19) CHARACTER SET 'utf8' NOT NULL,
  `nombre` VARCHAR(19) CHARACTER SET 'utf8' NOT NULL,
  `email` VARCHAR(100) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `dni` VARCHAR(10) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `movil` VARCHAR(9) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `departamento` VARCHAR(4) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `idUsuario` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UNIQ_5B7406D932DCDBAF` (`idUsuario` ASC),
  INDEX `fk_profesor_usuario1_idx` (`idUsuario` ASC),
  CONSTRAINT `FK_5B7406D932DCDBAF`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `tutores`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `tutores`.`grupo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tutores`.`grupo` ;

CREATE TABLE IF NOT EXISTS `tutores`.`grupo` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `tutor` VARCHAR(6) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `anyo` VARCHAR(7) CHARACTER SET 'utf8' NOT NULL,
  `grupo` VARCHAR(5) CHARACTER SET 'utf8' NOT NULL,
  `subgrupo` VARCHAR(5) CHARACTER SET 'utf8' NOT NULL,
  `ensenanza` VARCHAR(80) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `curso` INT(11) NULL DEFAULT NULL,
  `horarioVisita` VARCHAR(10) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `tutor` (`tutor` ASC),
  CONSTRAINT `FK_8C0E9BD399074648`
    FOREIGN KEY (`tutor`)
    REFERENCES `tutores`.`profesor` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `tutores`.`materia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tutores`.`materia` ;

CREATE TABLE IF NOT EXISTS `tutores`.`materia` (
  `codigo` VARCHAR(6) CHARACTER SET 'utf8' NOT NULL,
  `materia` VARCHAR(100) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `ensenanza` VARCHAR(100) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `curso` VARCHAR(1) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  PRIMARY KEY (`codigo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `tutores`.`materiaImpartida`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tutores`.`materiaImpartida` ;

CREATE TABLE IF NOT EXISTS `tutores`.`materiaImpartida` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `materia` VARCHAR(6) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `profesor` VARCHAR(6) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `grupo` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `index5` (`materia` ASC, `profesor` ASC, `grupo` ASC),
  INDEX `fk_MateriasImpartidas_Materias1_idx` (`materia` ASC),
  INDEX `fk_MateriasImpartidas_Profesores1_idx` (`profesor` ASC),
  INDEX `fk_materiaImpartida_grupo1_idx` (`grupo` ASC),
  CONSTRAINT `FK_17D5104F5B7406D9`
    FOREIGN KEY (`profesor`)
    REFERENCES `tutores`.`profesor` (`id`),
  CONSTRAINT `FK_17D5104F6DF05284`
    FOREIGN KEY (`materia`)
    REFERENCES `tutores`.`materia` (`codigo`),
  CONSTRAINT `FK_17D5104F8C0E9BD3`
    FOREIGN KEY (`grupo`)
    REFERENCES `tutores`.`grupo` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `tutores`.`materiaMatriculada`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tutores`.`materiaMatriculada` ;

CREATE TABLE IF NOT EXISTS `tutores`.`materiaMatriculada` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `expediente` INT(11) NULL DEFAULT NULL,
  `materia` VARCHAR(6) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `profesor` VARCHAR(6) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `anyo` VARCHAR(7) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `index4` (`expediente` ASC, `materia` ASC, `anyo` ASC),
  INDEX `IDX_E38E55AD59CA413` (`expediente` ASC),
  INDEX `fk_MateriasMatriculadas_Materias1_idx` (`materia` ASC),
  INDEX `fk_MateriasMatriculadas_Profesores1_idx` (`profesor` ASC),
  CONSTRAINT `FK_E38E55A5B7406D9`
    FOREIGN KEY (`profesor`)
    REFERENCES `tutores`.`profesor` (`id`),
  CONSTRAINT `FK_E38E55A6DF05284`
    FOREIGN KEY (`materia`)
    REFERENCES `tutores`.`materia` (`codigo`),
  CONSTRAINT `FK_E38E55AD59CA413`
    FOREIGN KEY (`expediente`)
    REFERENCES `tutores`.`alumno` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `tutores`.`matricula`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tutores`.`matricula` ;

CREATE TABLE IF NOT EXISTS `tutores`.`matricula` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `expediente` INT(11) NULL DEFAULT NULL,
  `grupo` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `index4` (`expediente` ASC, `grupo` ASC),
  INDEX `fk_matricula_grupo1_idx` (`grupo` ASC),
  CONSTRAINT `FK_15DF18858C0E9BD3`
    FOREIGN KEY (`grupo`)
    REFERENCES `tutores`.`grupo` (`id`),
  CONSTRAINT `FK_15DF1885D59CA413`
    FOREIGN KEY (`expediente`)
    REFERENCES `tutores`.`alumno` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
