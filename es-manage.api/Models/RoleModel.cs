using System ;
namespace es_manage.api.Models
{
    public class RoleModel
    {
        public string? Id { get; set; }
        public string RoleName { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}
