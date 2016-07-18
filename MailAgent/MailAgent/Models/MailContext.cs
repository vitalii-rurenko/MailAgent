using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MailAgent.Models
{
    public class MailContext : DbContext
    {
        public DbSet<Email> Emails { get; set; }
    }
}