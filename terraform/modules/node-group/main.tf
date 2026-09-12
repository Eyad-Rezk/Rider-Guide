resource "aws_eks_node_group" "my_eks_node_group" {
  cluster_name    = var.cluster_name
  node_group_name = var.node_group_name
  node_role_arn   = aws_iam_role.node_group_role.arn
  subnet_ids      = var.subnet_ids
  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 2
  }
  update_config {
    max_unavailable = 1
  }
  depends_on = [
            aws_iam_role.node_group_role,
            aws_iam_role_policy_attachment.node_group_AmazonEKSWorkerNodePolicy,
            aws_iam_role_policy_attachment.node_group_AmazonEKS_CNI_Policy,
            aws_iam_role_policy_attachment.node_group_AmazonEC2ContainerRegistryReadOnly
            ]
}

resource "aws_iam_role" "node_group_role" {
  name = "TR-EKS-Node-Group-Role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}
resource "aws_iam_role_policy_attachment" "node_group_AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.node_group_role.name
}
resource "aws_iam_role_policy_attachment" "node_group_AmazonEKS_CNI_Policy" {
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
    role       = aws_iam_role.node_group_role.name
}
resource "aws_iam_role_policy_attachment" "node_group_AmazonEC2ContainerRegistryReadOnly" {
    policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
    role       = aws_iam_role.node_group_role.name
}