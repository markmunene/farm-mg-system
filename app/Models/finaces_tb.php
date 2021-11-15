<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class finances_tb extends Model
{
    /*
Expense_name
Expense_amount
Income_name
Income_amount
User_id
    */
    use HasFactory;
    protected $fillable = ['Expense_name', 'Expense_amount', 'Income_name', 'User_id', 'Income_amount'];
}
