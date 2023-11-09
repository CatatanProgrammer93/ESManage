using System.ComponentModel.DataAnnotations;

namespace es_manage.api.Models {
    public class PasswordChangeModel {
        public int? UserId { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}