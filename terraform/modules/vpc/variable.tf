#_________vpc___________________________
variable "cidr_block" {
    type = string
}
variable "instance_tenancy" {
    type = string
}
variable "vpc_name" {
    type = string
}

#_________subnet___________________________
variable "public_subnet_cidr_1" {
    type = string
}
variable "public_subnet_cidr_2" {
    type = string
}
variable "public_subnet_name_1" {
    type = string
}
variable "public_subnet_name_2" {
    type = string
}
variable "availability_zone_1" {
    type = string
}
variable "availability_zone_2" {
    type = string
}
#_________internet_gateway___________________________
variable "igw_name" {
    type = string
}
#_________route_table___________________________
variable "public_route_table_name" {
    type = string
}
variable "public_route_table_cidr" {
    type = string
}
#_________security_group___________________________
variable "sg_name" {
    type = string
}
variable "port"{
    type = list(string)
}
