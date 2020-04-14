<?php

namespace App\Notifications;

//use Illuminate\Bus\Queueable;
//use Illuminate\Contracts\Queue\ShouldQueue;
//use Illuminate\Notifications\Messages\MailMessage;
//use Illuminate\Notifications\Notification;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;

class RegisteredNotification extends VerifyEmailBase
{
    //use Queueable;

   
   /* public function via($notifiable)
    {
        return ['mail'];
    }

    
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('Vous avez solliter une demande de creation de compte, veuillez cliquer sur le lien ci-dessous pour valider votre compte.')
                    ->action('Notification Action', url('/'))
                    ->line('merci de nous rejoindre')
                    ->line('l\'equipe Gadgets')
                    ->line('Cordialement,');
    }

    public function toArray($notifiable)
    {
        return [
            //
        ];
    }*/

    protected function verificationUrl($notifiable)
    {
      return URL::temporarySignedRoute('verification.verify', Carbon::now()->addMinutes(60), ['id' => $notifiable->getKey()]
      );  
     // this will basically mimic the email endpoint with get request
    }
}
