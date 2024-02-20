using System.ComponentModel.DataAnnotations;

namespace es_manage.api.Models
{
    public class PrivilegeModel
    {
        public string ID { get; set; } = string.Empty;
        public string PrivilegeName { get; set; }
        public string PrivilegeType { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public bool Deleted { get; set; }
        public string MenuId { get; set; }
    }
}