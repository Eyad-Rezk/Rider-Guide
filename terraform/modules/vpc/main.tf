#____________________________vpc___________________________
resource "aws_vpc" "my_vpc" {
  cidr_block       = var.cidr_block
  instance_tenancy = var.instance_tenancy
  tags = {
    Name = var.vpc_name
  }
}
#___________________________subnet___________________________
resource "aws_subnet" "TR-EKS-public_subnet_1" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = var.public_subnet_cidr_1
  availability_zone = var.availability_zone_1
  map_public_ip_on_launch = true
  tags = {
    Name = var.public_subnet_name_1
  }
}
resource "aws_subnet" "TR-EKS-public_subnet_2" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = var.public_subnet_cidr_2
  availability_zone = var.availability_zone_2
  map_public_ip_on_launch = true
  tags = {
    Name = var.public_subnet_name_2
  }
}
#____________________________internet_gateway___________________________
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.my_vpc.id
  tags = {
    Name = var.igw_name
  }
}
#___________________________route_table___________________________
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.my_vpc.id
  route {
    cidr_block = var.public_route_table_cidr
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = {
    Name = var.public_route_table_name
  }
}
resource "aws_route_table_association" "public-route-table-association-1" {
  subnet_id      = aws_subnet.TR-EKS-public_subnet_1.id
  route_table_id = aws_route_table.public_route_table.id
}
resource "aws_route_table_association" "public-route-table-association-2" {
  subnet_id      = aws_subnet.TR-EKS-public_subnet_2.id
  route_table_id = aws_route_table.public_route_table.id
}
#__________________________________security_group___________________________
resource "aws_security_group" "sg-1" {
  name        = var.sg_name
  description = "Allow SSH and HTTP inbound traffic"
  vpc_id      = aws_vpc.my_vpc.id
    dynamic "ingress" {
        for_each = var.port
        content {
        from_port   = ingress.value
        to_port     = ingress.value
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
      }
    }
}
