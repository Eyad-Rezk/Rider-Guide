resource "aws_eks_access_entry" "admin" {
  cluster_name  = var.cluster_name
  principal_arn = var.user_arn
  type          = "STANDARD"
}
resource "aws_eks_access_policy_association" "admin" {
  cluster_name  = var.cluster_name
  principal_arn = aws_eks_access_entry.admin.principal_arn
  policy_arn    = var.policy_arn

  access_scope {
    type = "cluster"
  }
}