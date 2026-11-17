<?php

$teams = [];
$usersTeams = [];

$n = intval(fgets(STDIN));

for ($i = 0; $i < $n; $i++) {
    $data = explode("-", fgets(STDIN));
    $creator = $data[0];
    $teamName = trim($data[1]);

    if (isset($teams[$teamName])) {
        echo "Team {$teamName} was already created!\n";
    } elseif (isset($usersTeams[$creator])) {
        echo "{$creator} cannot create another team!\n";
    } else {
        $teams[$teamName] = ['creator' => $creator, 'members' => []];
        $usersTeams[$creator] = $teamName;
        echo "Team {$teamName} has been created by {$creator}!\n";
    }
}

while (true) {
    $input = fgets(STDIN);
    if (trim($input) === 'end of assignment') {
        break;
    }

    $data = explode("->", trim($input));
    $user = $data[0];
    $teamName = $data[1];

    if (!isset($teams[$teamName])) {
        echo "Team {$teamName} does not exist!\n";
    } elseif (isset($usersTeams[$user])) {
        echo "Member {$user} cannot join team {$teamName}!\n";
    } else {
        $teams[$teamName]['members'][] = $user;
        $usersTeams[$user] = $teamName;
    }
}

$active = array_filter($teams, fn($team) => !empty($team['members']));
$teamsToDisband = array_keys(array_diff_key($teams, $active));
sort($teamsToDisband);

// most members first, then by team name
uksort($active, fn($a, $b) => [count($active[$b]['members']), $a] <=> [count($active[$a]['members']), $b]);

foreach ($active as $teamName => $team) {
    sort($team['members']);
    echo "{$teamName}\n- {$team['creator']}\n";
    foreach ($team['members'] as $member) {
        echo "-- {$member}\n";
    }
}

echo "Teams to disband:\n";
foreach ($teamsToDisband as $teamName) {
    echo "{$teamName}\n";
}
