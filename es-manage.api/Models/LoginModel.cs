using System.ComponentModel.DataAnnotations;

namespace es_manage.api.Models {
    public class LoginModel {
        // Username dengan tipe data string, not null, required
        [Required(ErrorMessage = "Username tidak boleh kosong")]
        public string UserName { get; set; }

        // Password dengan tipe data string, not null, required
        [Required(ErrorMessage = "Password tidak boleh kosong")]
        public string Password { get; set; }
    }
}