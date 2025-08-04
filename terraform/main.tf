locals {
  env    = terraform.workspace
  name   = "${var.REPO_NAME}" 
  tags   = { Env = terraform.workspace , Terraform = true }
  domain = "${var.domain}"
}

module "vpc" {
  source = "./modules/vpc"
  name   = local.name
}

module "ec2" {
  source = "./modules/ec2"

  SSH_KEY        = var.SSH_KEY
  SSH_KEY_PUB    = var.SSH_KEY_PUB
  REPO_NAME      = var.REPO_NAME
  FULL_REPO_NAME = var.FULL_REPO_NAME
  name           = local.name
  type           = var.type
  vpc_id         = module.vpc.vpc_id
  subnet_ids     = module.vpc.public_subnet_ids
  tags           = local.tags
  ports          = var.ports
  domain         = local.domain
  depends_on     = [
    module.vpc
  ]
}

# module "fe" {
#   source = "./modules/s3/"
#   name   = "${local.name}-fe-website"
# }

