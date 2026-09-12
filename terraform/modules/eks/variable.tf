variable "cluster_name" {
  type        = string
}
variable "subnet_ids" {
  type        = list(string)
}
variable "authentication_mode" {
  type        = string
}
variable "vpc_id" {
  type        = string
}

