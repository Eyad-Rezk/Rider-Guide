#______________________EKS Cluster______________________
resource "aws_eks_cluster" "my_eks_cluster" {
  name = var.cluster_name
  access_config {
    authentication_mode = var.authentication_mode
  }
  role_arn = aws_iam_role.cluster_role.arn
  version  = "1.35"
  vpc_config {
    subnet_ids = var.subnet_ids
  }
  depends_on = [
    aws_iam_role_policy_attachment.cluster_AmazonEKSClusterPolicy,
  ]
}

#______________________EKS Cluster IAM Role______________________
resource "aws_iam_role" "cluster_role" {
  name = "TR-EKS-Cluster-Role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "sts:AssumeRole",
          "sts:TagSession"
        ]
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      },
    ]
  })
}
#______________________EKS Cluster IAM Role Policy Attachment______________________
resource "aws_iam_role_policy_attachment" "cluster_AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.cluster_role.name
}

