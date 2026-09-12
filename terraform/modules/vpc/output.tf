output "myvpc_id" {
  value = aws_vpc.my_vpc.id
}
output "public_subnet_1_id" {
  value = aws_subnet.TR-EKS-public_subnet_1.id
}
output "public_subnet_2_id" {
  value = aws_subnet.TR-EKS-public_subnet_2.id
}
