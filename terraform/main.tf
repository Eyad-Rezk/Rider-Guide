module "vpc" {
   source = "./modules/vpc"
   cidr_block = "10.0.0.0/16"
   instance_tenancy = "default"
   vpc_name = "TR-EKS-VPC"
   public_subnet_cidr_1 = "10.0.1.0/24"
   public_subnet_cidr_2 = "10.0.2.0/24"
   public_subnet_name_1 = "TR-EKS-Public-Subnet-1"
   public_subnet_name_2 = "TR-EKS-Public-Subnet-2"
   availability_zone_1 = "us-east-1a"
   availability_zone_2 = "us-east-1b"
   igw_name = "TR-EKS-IGW"
   public_route_table_name = "TR-EKS-Public-Route-Table"
   public_route_table_cidr = "0.0.0.0/0"
   sg_name = "TR-EKS-SG"
   port = ["22", "80", "443", "6443", "2379", "2380", "10250", "10259", "10257"]
}
module "eks" {
   source = "./modules/eks"
   cluster_name = "TR-EKS-Cluster"
   authentication_mode = "API"
   vpc_id = module.vpc.myvpc_id
   subnet_ids = [module.vpc.public_subnet_1_id, module.vpc.public_subnet_2_id]
   depends_on = [module.vpc]
}
module "node_group" {
   source = "./modules/node-group"
   cluster_name = module.eks.cluster_name
   node_group_name = "TR-EKS-Node-Group"
   subnet_ids = [module.vpc.public_subnet_1_id, module.vpc.public_subnet_2_id]
   depends_on = [module.eks]
}
module "iam" {
   cluster_name = module.eks.cluster_name
   source = "./modules/iam"
   user_arn = "arn:aws:iam::475603132310:user/Admin-user1"
   policy_arn = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"
   depends_on = [module.eks]
}